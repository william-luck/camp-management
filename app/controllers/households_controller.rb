class HouseholdsController < ApplicationController

    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid_data_error

    def index
        households = Household.all
        render json: households, include: ['beneficiaries', 'count', 'account.distributions']
    end
    
    def show 
        household = Household.find(params[:id])
        render json: household, status: :ok
    end

    def update
        household = Household.find(params[:id])
        if household.user.id == session[:user_id]
            household.update!(household_params)
            render json: household, status: :accepted
        else
            render json: ['You must be responsible for this household to update information']
        end
    end

    def create

        household = Household.create(household_params)

        beneficiary = Beneficiary.new(beneficiary_params)
        beneficiary.household_id = household.id
        beneficiary.save!

        account = Account.create(user_id: params[:user_id], household_id: household.id, funds: 0)

        render json: household, status: :created

    end

    def destroy

        household = Household.find(params[:id])
        if session[:user_id] == household.user.id
            household.destroy
            head :no_content
        else
            render json: ['You must own this household to delete']
        end
    end

    private

    def household_params
        params.permit(:address, :date_of_entry)
    end

    def beneficiary_params
        params.permit(:name, :gender, :DOB, :phone_number, :national_id_number, :head_of_HH)
    end

    def render_invalid_data_error(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
    
end

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
        household.update!(household_params)
        render json: household, status: :accepted
    end

    def create
        # byebug
        # If something in the params matches add new HH, go through all three, but if not, just create the beneficiary as normal
        household = Household.create(household_params)

        beneficiary = Beneficiary.new(beneficiary_params)
        beneficiary.household_id = household.id
        beneficiary.save!

        account = Account.create(user_id: params[:user_id], household_id: household.id, funds: 0)

        render json: household, status: :created

        # Normal for create household..... Seperate from beneficiary controller. The only time that we are creating the household is when adding new beneficiary to go along with it too.. 
        # household = Household.create!(household_params)
        # render json: household, status: :created
    end

    def destroy
        household = Household.find(params[:id])
        household.destroy
        head :no_content
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

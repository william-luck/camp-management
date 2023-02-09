class BeneficiariesController < ApplicationController

    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid_data_error

    def show
        beneficiary = Beneficiary.find_by!(national_id_number: params[:id])
        render json: beneficiary, status: :ok
    rescue ActiveRecord::RecordNotFound
        render json: ['Beneficiary not found'], status: :not_found
    end

    def create
        matching_household = Household.find(params[:household_id])
        if session[:user_id] == matching_household.id
            beneficiary = Beneficiary.create!(beneficiary_params)
            render json: beneficiary, status: :created
        else
            render json: ['You must be responsible for this household to add a beneficiary']
        end
    end

    def update 
        beneficiary = Beneficiary.find(params[:id])
            if session[:user_id] == beneficiary.household.user.id
            beneficiary.update!(beneficiary_params)
            render json: beneficiary, status: :accepted
        else
            render json: ['You must be responsible for this household to edit beneficiary information']
        end
    end

    def destroy
        matching_household = Household.find(params[:id])
        if session[:user_id] == matching_household.id
            beneficiary = Beneficiary.find(params[:id])
            beneficiary.destroy
            head :no_content
        else
            render json: ['You must be responsible for this household to delete this beneficiary']
        end
    end

    private

    def beneficiary_params
        params.permit(:name, :gender, :DOB, :head_of_HH, :phone_number, :national_id_number, :household_id)
    end

    def render_invalid_data_error(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

end

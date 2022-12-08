class BeneficiariesController < ApplicationController

    def create
        beneficiary = Beneficiary.create!(beneficiary_params)
        render json: beneficiary, status: :created
    end

    def update 
        beneficiary = Beneficiary.find(params[:id])
        beneficiary.update!(beneficiary_params)
        render json: beneficiary, status: :accepted
    end

    def destroy
        beneficiary = Beneficiary.find(params[:id])
        beneficiary.destroy
        head :no_content
    end

    private

    def beneficiary_params
        params.permit(:name, :gender, :DOB, :head_of_HH, :phone_number, :national_id_number, :household_id)
    end
end

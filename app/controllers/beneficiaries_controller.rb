class BeneficiariesController < ApplicationController

    def update 
        beneficiary = Beneficiary.find(params[:id])
        beneficiary.update!(beneficiary_params)
        render json: beneficiary, status: :accepted
    end

    private

    def beneficiary_params
        params.permit(:head_of_HH, :phone_number, :national_id_number)
    end
end

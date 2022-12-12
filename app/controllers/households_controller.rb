class HouseholdsController < ApplicationController

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
        household = Household.create!(household_params)
        render json: household, status: :created
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
    
end

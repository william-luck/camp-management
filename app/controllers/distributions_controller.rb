class DistributionsController < ApplicationController

    def create
        distribution = Distribution.create!(distribution_params)
        render json: distribution, status: :created
    end

    def index 
        distributions = Distribution.all
        render json: distributions
    end

    private 

    def distribution_params 
        params.permit(:account_id, :amount, :date, :collected)
    end
end

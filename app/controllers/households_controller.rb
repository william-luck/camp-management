class HouseholdsController < ApplicationController

    def index
        households = Household.all
        render json: households, include: ['beneficiaries', 'count', 'account.distributions']
    end
    
end

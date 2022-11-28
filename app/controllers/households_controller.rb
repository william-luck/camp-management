class HouseholdsController < ApplicationController

    def index
        households = Household.all
        render json: households, include: ['account', 'account.distributions']
    end
    
end

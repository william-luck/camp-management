class HouseholdsController < ApplicationController

    def index
        households = Household.all
        render json: households
    end
    
end

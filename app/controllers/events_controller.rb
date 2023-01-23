class EventsController < ApplicationController

    def index
        events = Event.all
        render json: events
    end

    def create 
        # byebug
        event = Event.create!(event_params)
        render json: event, status: :created
        
    end

    private 

    def event_params
        params.permit(:date)
    end


end

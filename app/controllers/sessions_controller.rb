class SessionsController < ApplicationController

    # POST /login
    def create
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user
        else
            # Return error as json if invalid username or password
            render json: {errors: 'Username or password is incorrect'}
        end

    end
end

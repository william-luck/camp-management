class AccountsController < ApplicationController

    def index
        accounts = Account.all
        render json: accounts, status: :ok
    end

    def update
        account = Account.find(params[:id])
        account.update!(account_params)
        render json: account, status: :accepted
    end

    def create
        account = Account.create!(account_params)
        render json: account, status: :created
    end

    private

    def account_params
        params.permit(:user_id, :household_id, :funds)
    end

    
end

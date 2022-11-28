class AccountsController < ApplicationController

    def index
    end

    def update
        account = Account.find(params[:id])
        account.update!(account_params)
        render json: account, status: :accepted
    end

    private

    def account_params
        params.permit(:funds)
    end

    
end

class UsersController < ApplicationController
    def index
        @users = User.all
        render json: @users, status: :ok
    end


    def show
      @user = User.find(params[:id])
      render json: @user.profile_json, status: :ok
    end
end

class EventsController < ApplicationController
    def index
        @events = Event.all
        render json: @events, status: :ok
    end

    def new
        @event = Event.new(event_params)
    end

    def create
        @event = Event.new(event_params)
        if @event.save
            render json: @event, status: :created
        else
            render json: @event.errors.full_messages, status: :unprocessable_entity
        end
    end

    def destroy
        @event = Event.find(params[:id])
        @event.destroy

        render json: @events
    end

    private

    def event_params
        params.require(:event).permit(:name, :url, :date, :time, :price, :city, :venue, :user_id)
    end
end

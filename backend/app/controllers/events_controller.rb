class EventsController < ApplicationController
    def index
        @events = Event.all
        render json: @animals, status: :ok
    end
end

class User < ApplicationRecord
    has_many :events

    def profile_json
        {
            username: self.name,
            age: self.age,
            city: self.city,
            image: self.image,
            events: self.events
        }.to_json
    end
end

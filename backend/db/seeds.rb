# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

brian = User.create!(username: 'bcho12', age: 26, city: 'Atlanta', image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/intermediary/f/25d45014-8cc3-4c98-b02c-5a0cf3a55ddd/dcrauly-8b5ebd2e-2fb3-4ba0-8e58-af63f76366aa.png/v1/fill/w_890,h_898,strp/soccer_ball_on_a_transparent_background__by_prussiaart_dcrauly-pre.png')
# sarah = User.create!(username: 'syun07', age: 23, city: 'Atlanta', image: 'https://pbs.twimg.com/profile_images/378800000532546226/dbe5f0727b69487016ffd67a6689e75a_400x400.jpeg')

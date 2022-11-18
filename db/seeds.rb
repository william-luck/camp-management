require 'faker'



# Create one user (camp manager)
User.create(username: 'camp_manager', password: 'test_password', email: 'management@management.com', district: 'Dahuk', governorate: 'Dahuk')

# Create 20 HHs, with 3 - 8 beneficiaries each, with one head of HH
20.times do |count|
    household = Household.create(date_of_entry: Faker::Date.between(from: '2014-07-01', to: '2021-12-31'), address: "#{rand(1..50)}#{('A'..'Z').to_a.sample}")

    phone_number = "+964-#{rand(100000000..9999999999)}"

    rand(2..7).times do |count|
        Beneficiary.create(
            name: Faker::Name.name,
            gender: Faker::Gender.binary_type,
            DOB: Faker::Date.between(from: '1952-01-01', to: '2021-12-31'),
            phone_number: "+964-#{rand(100000000..9999999999)}",
            national_id_number: phone_number,
            head_of_HH: false,
            HH_id: household.id
        )
    end

    Beneficiary.create(
            name: Faker::Name.name,
            gender: Faker::Gender.binary_type,
            DOB: Faker::Date.between(from: '1952-01-01', to: '1980-12-31'),
            phone_number: phone_number,
            national_id_number: rand(100000000..9999999999),
            head_of_HH: true,
            HH_id: household.id
        )

    # Create an account for the HH
    account = Account.create(user_id: 1, HH_id: household.id, funds: 0)

    # Create 10 distributions for each HH
    # Distribution.create(
    #     account_id: account.id,
    #     amount: 
    # )



    # Create account for each of 20 HHs
    # 20.times do |count|
    #     account = Account.create(user_id: 1, HH_id: count + 1, funds: 0)
    #     10.times do |count|
    #         Distribution.create(
    #             account_id: 
    #         )
    #     end
    # end


end





# Create distribution








# Random distributions

# Random beneficiary
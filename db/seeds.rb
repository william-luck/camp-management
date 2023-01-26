require 'faker'

def generate_distribution_date(count)
    if count < 9 
        "2022-0#{count+1}-0#{rand(1..7)}"
    else
        "2022-#{count+1}-0#{rand(1..7)}"
    end
end

def pair_event_to_distribution(count)
    Event.find(count+1).date
end





# Create one user (camp manager)
User.create(username: 'camp_manager', password: 'test_password', email: 'management@management.com', district: 'Dahuk', governorate: 'Dahuk')
User.create(username: 'camp_manager2', password: 'test_password', email: 'management@management.com', district: 'Dahuk', governorate: 'Dahuk')

10.times do |count|
    Event.create(date: generate_distribution_date(count))
end

Event.create(date: Date.today)

# Create 10 HHs, with 3 - 8 beneficiaries each, with one head of HH, for user 1
10.times do |count|
    household = Household.create(date_of_entry: Faker::Date.between(from: '2014-07-01', to: '2021-12-31'), address: "#{rand(1..50)}#{('A'..'Z').to_a.sample}")

    phone_number = "+964-#{rand(1000000000..9999999999)}"

    rand(2..7).times do |count|
        Beneficiary.create(
            name: Faker::Name.name,
            gender: Faker::Gender.binary_type,
            DOB: Faker::Date.between(from: '1952-01-01', to: '2021-12-31'),
            phone_number: phone_number,
            national_id_number: rand(100000000..999999999),
            head_of_HH: false,
            household_id: household.id
        )
    end

    Beneficiary.create(
            name: Faker::Name.name,
            gender: Faker::Gender.binary_type,
            DOB: Faker::Date.between(from: '1952-01-01', to: '1980-12-31'),
            phone_number: phone_number,
            national_id_number: rand(100000000..999999999),
            head_of_HH: true,
            household_id: household.id
        )

    # Create an account for the HH
    account = Account.create(user_id: 1, household_id: household.id, funds: 0)
    amount_multiplier = household.beneficiaries.count

    # Generate distribution date to be used in Event creation and individual distribution creation
    

    # Create 10 distributions for the year for beneficiaries
    10.times do |count| 

        Distribution.create(
            account_id: account.id,
            event_id: count+1,
            amount: 12000 * amount_multiplier, 
            date: pair_event_to_distribution(count),
            collected: true
        )
    end
end

# Create 10 HHs and accounts for user 2
10.times do |count|
    household = Household.create(date_of_entry: Faker::Date.between(from: '2014-07-01', to: '2021-12-31'), address: "#{rand(1..50)}#{('A'..'Z').to_a.sample}")

    phone_number = "+964-#{rand(1000000000..9999999999)}"

    rand(2..7).times do |count|
        Beneficiary.create(
            name: Faker::Name.name,
            gender: Faker::Gender.binary_type,
            DOB: Faker::Date.between(from: '1952-01-01', to: '2021-12-31'),
            phone_number: phone_number,
            national_id_number: rand(100000000..999999999),
            head_of_HH: false,
            household_id: household.id
        )
    end

    Beneficiary.create(
            name: Faker::Name.name,
            gender: Faker::Gender.binary_type,
            DOB: Faker::Date.between(from: '1952-01-01', to: '1980-12-31'),
            phone_number: phone_number,
            national_id_number: rand(100000000..999999999),
            head_of_HH: true,
            household_id: household.id
        )

    # Create an account for the HH
    account = Account.create(user_id: 2, household_id: household.id, funds: 0)
    amount_multiplier = household.beneficiaries.count

    # Generate distribution date to be used in Event creation and individual distribution creation
    

    # Create 10 distributions for the year for beneficiaries
    10.times do |count| 

        Distribution.create(
            account_id: account.id,
            event_id: count+1,
            amount: 12000 * amount_multiplier, 
            date: pair_event_to_distribution(count),
            collected: true
        )
    end
end



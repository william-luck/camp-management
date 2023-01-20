require 'faker'

def generate_distribution_date(count)
    if count < 9 
        "2022-0#{count+1}-0#{rand(1..7)}"
    else
        "2022-#{count+1}-0#{rand(1..7)}"
    end
end



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
            phone_number: phone_number,
            national_id_number: rand(10000000..999999999),
            head_of_HH: false,
            household_id: household.id
        )
    end

    Beneficiary.create(
            name: Faker::Name.name,
            gender: Faker::Gender.binary_type,
            DOB: Faker::Date.between(from: '1952-01-01', to: '1980-12-31'),
            phone_number: phone_number,
            national_id_number: rand(10000000..999999999),
            head_of_HH: true,
            household_id: household.id
        )

    # Create an account for the HH
    account = Account.create(user_id: 1, household_id: household.id, funds: 0)
    amount_multiplier = household.beneficiaries.count

    # Create 10 distributions for the year for beneficiaries
    
    
    10.times do |count| 
        Distribution.create(
            account_id: account.id,
            amount: 12000 * amount_multiplier, 
            date: generate_distribution_date(count),
            collected: true
        )
    end
end



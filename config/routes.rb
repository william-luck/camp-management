Rails.application.routes.draw do
  
  resources :users
  resources :distributions
  resources :accounts
  resources :households
  resources :beneficiaries

  post '/login', to: 'sessions#create'
  get '/me', to: 'users#show'
  post '/signup', to: 'users#create'
  delete '/logout', to: 'sessions#destroy'
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end

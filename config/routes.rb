Rails.application.routes.draw do
  
  resources :events, only: [:index, :update, :create]
  resources :users, only: [:show, :create]
  resources :distributions, only: [:index, :create]
  resources :accounts, only: [:index, :update, :create]
  resources :households
  resources :beneficiaries, only: [:create, :update, :destroy]

  post '/login', to: 'sessions#create'
  get '/me', to: 'users#show'
  post '/signup', to: 'users#create'
  delete '/logout', to: 'sessions#destroy'
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end

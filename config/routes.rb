Rails.application.routes.draw do
  root 'home#index'
  # get 'home#index'
  get '/instagram', to: 'home#instagram'
  resources :maps, only: [:index, :show]

  # resources :tasks, exclude: [:show]
  # resources :tasks, only: [:show]
  # root 'tasks#index'
end

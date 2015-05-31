Rails.application.routes.draw do
  root 'home#index'
  # get 'home#index'

  # resources :tasks, exclude: [:show]
  # resources :tasks, only: [:show]
  # root 'tasks#index'
end

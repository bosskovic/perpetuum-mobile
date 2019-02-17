---
slug:       "building-a-json-api-in-rails"
title:      Building a JSON API in rails
excerpt:    notes
category:   tech_notes
parent_category: tech
tags:
  - ttn-api
  - ttn-ruby
---

#### Object#to_json

Any object that implements #to_json can be serialized straight onto the world. Very useful for quick and dirty JSON APIs, 
since ActiveModel instances, including ActiveRecord and ActiveRecord associations, all implement this.

# some controller

    def show
      user = User.find(params[:id])
      render json: user
    end

This will serialize all attributes in the user model. You can customize what is and isn't exposed, but the baseline is 
exposing all attributes and then allowing you to blacklist/whitelist what you want. A big problem with this is that 
there's no easy way to include request data in the responses (such as session information) and for more complicated 
representations you end up building complicated hashes and conditionals. Moreover, it means that for any complex payload 
you end up defining representation logic inside your model layer, which goes against basic separation of concerns.

#### ActiveModelSerializers

http://new-bamboo.co.uk/blog/2013/11/21/oat-explicit-media-type-serializers-in-ruby
---
slug:       adding-uuid-to-rails
title:      Adding UUID to rails
excerpt:    notes
category:   tech_notes
parent_category: tech
tags:
  - ttn-database
  - ttn-ruby
---

#### In concern

    module Uuid
      extend ActiveSupport::Concern

      included do
        before_create :generate_uuid
      end

      protected

      def generate_uuid
        self.uuid = loop do
          random_uuid = SecureRandom.urlsafe_base64(nil, false)
          break random_uuid unless self.class.exists?(uuid: random_uuid)
        end
      end
    end

#### Resources

- github: gem - <a href="https://github.com/jashmenn/activeuuid">jashmenn / activeuuid</a>
- blog: <a href="http://blog.codinghorror.com/primary-keys-ids-versus-guids/">Primary Keys: IDs versus GUIDs</a> (19-05-2007)
- blog: <a href="http://rny.io/rails/postgresql/2013/07/27/use-uuids-in-rails-4-with-postgresql.html">Use UUIDs in Rails 4 with PostgreSQL </a>(27-07-2013)
- stackoverflow: <a href="http://stackoverflow.com/questions/2977593/is-it-safe-to-assume-a-guid-will-always-be-unique">Is it safe to assume a GUID will always be unique?</a>


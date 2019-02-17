---
slug:       "activerecord-notes"
title:      ActiveRecord notes
excerpt:    Uniqueness on a combination of fields, inclusion in array, getting all model associations, overriding model getters and setters, serialization...
category:   tech_notes
parent_category: tech
tags:
  - ttn-ruby
---
#### Contents

- <a href="#uniqueness_on_a_combination_of_fields">Uniqueness on a combination of fields</a>
- <a href="#inclusion_in_array">Inclusion in array</a>
- <a href="#getting_all_model_associations">Getting all model associations</a>
- <a href="#overriding_model_getters_and_setters">Overriding model getters and setters</a>
- <a href="#serialization">Serialization</a>

<hr id="uniqueness_on_a_combination_of_fields" />

#### Uniqueness on a combination of fields

In the model:

    validates :name, presence: true, uniqueness: { scope: :genus, message: Species::NAME_GENUS_VALIDATION_ERROR }
    validates :genus, presence: true

In the spec:

    subject { FactoryGirl.create(:species) }
    it { is_expected.to validate_uniqueness_of(:name).scoped_to(:genus).with_message(Species::NAME_GENUS_VALIDATION_ERROR) }

Before testing uniqueness a record must be created.  
In the migration:

    add_index :species, [:name, :genus]

The index should be added on to the fields to enforce field combination uniqueness in the database.

#### Resources

- stackoverflow: <a href="http://stackoverflow.com/questions/10041850/best-way-to-validate-uniqueness-of-two-fields-together-using-scope-in-rails">Best way to validate uniqueness of two fields together using scope in rails</a>
- blog: <a href="http://robots.thoughtbot.com/the-perils-of-uniqueness-validations">The Perils of Uniqueness Validations</a>

<hr id="inclusion_in_array" />

#### Inclusion in array

In the model:
    validates :role, presence: true, inclusion: {in: ROLES}

In the spec:

    it { is_expected.to ensure_inclusion_of(:role).in_array(User::ROLES) }

<hr id="getting_all_model_associations" />

#### Getting all model associations

    model_class(model).reflect_on_all_associations.map { |a| a.name }

<hr id="overriding_model_getters_and_setters" />

#### Overriding model getters and setters

    def habitats
      read_attribute(:habitats)
    end
    
    def habitats=(value)
      write_attribute(:habitats, value)
    end

<hr id="serialization" />

#### Serialization

In model:

    serialize :substrates, JSON
    
In controller:

    def permitted_params
      @params ||= params.require(:characteristics).permit(PUBLIC_FIELDS).tap do |white_listed|
        white_listed[:substrates] = params[:characteristics][:substrates]
      end
    end
    
When searching:

    Characteristic.where(substrates: ["flash", "branches", "leaves"].to_json)
    
#### resources

- <a href="https://xpitality.slack.com/messages/lounge/files/F03BRRAAG/">Different Ways to Set Attributes in ActiveRecord - cheat sheet</a>


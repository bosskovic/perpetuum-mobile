---
slug:       "aws-eb-setup"
title:      AWS Elastic Beanstalk setup
excerpt:    aws-eb-setup
tags:
  - ttt-aws
  - ttt-eb
animation:
  url: /assets/img/animated/tech.gif
  width: 250
  height: 176
published: false    
---

### Step 1 - Generate SSH key

Sign into aws, select the region and go to EC2. Scroll down in the sidebar and select *Key Pairs* under NETWORK & SECURITY

eb01-ec2

Create a new key pair and store the generated pem file in a safe location. 

eb02-ec2key

### Step 2 - Security group

Navigate to *Security groups* just above *Key pairs* in the same sidebar and create a Security group. Temporarily provide
full access to all requests coming from your own IP address.

eb03-security-group

### Step 3 - Create RDS database

Go to RDS section.

eb04-rds

Open RDS Dashboard and create a database. Select the previously created security group. Check the details of newly created
instance and take a note of the db endpoint

    https://eu-central-1.console.aws.amazon.com/ec2/v2/home?region=eu-central-1#SecurityGroups:search=sg-0b517a4b5bf136a45
    
### Step 4 - Create ElasticCache Redis cluster

Go to ElasticCache Dashboard and create a Redis cluster

eb05-elasticcache

Specify the previously created Security group. When done, go to the cluster details and take a note of the endpoint for
the newly created cluster.

    cms2demoapp-001.6qyq57.0001.euc1.cache.amazonaws.com

### Step 5 - Create ElasticBeanstalk web app

Go to Elastic Beanstalk dashboard and create a new web app. Make sure to select Multi-container Docker platform.

    http://cms2demoapp-env.w2d29jpgv7.eu-central-1.elasticbeanstalk.com/
---
layout:     tech_post
categories: ['tech']
slug:       "authentication-methods"
title:      Authentication techniques for REST API
excerpt:    API keys, username & password, authentication token, security concerns, nonce
date:       2014-08-17
tags:
  - ttt-api
  - ttt-featured
  - ttt-security
animation:
  url: /assets/img/animated/tech.gif
  width: 250
  height: 176
---

A REST API should be stateless. This means no sessions - for accessing protected content the credentials need to be sent with each request.

There are various approaches to storing and sending the credentials suitable for different applications.

### API keys

The safest way for securing an API is to securely generate and distribute API key/secret pair, which is then stored in a 
file on the client machine, to which only the owner has the read access. The client is authenticated on every request 
by including the key/secret in the request header.

Since API secret is a hash (it consists of a number of randomly generated characters, alpha numeric + special signs) it 
is **resistant to dictionary attacks** (unlike some passwords); also usually it is significantly **longer and with more 
entropy** than most passwords are, making the brute force attacks more costly.

( -> more on dictionary attacks in a post on <a href="/tech/password-attacks">Password attacks</a> )  
( -> more about secure hash generation in a post on <a title="Hashing, encryption, obfuscation" href="/tech/hashing-and-encryption/">Hashing and Encryption</a> )
    
They are also more **convenient for regular rotation** or resetting. Having the API secret exposed (for example in the 
code on the production machine) does not compromise the account the way the exposing the master credentials would.

If the secret is not rehashed on the server, it is a speed benefit compared to the username/password access.

This approach is best for API intended for inter-application communication. It is less convenient for single page applications.

#### Resources

- blog: stormpath - <a href="https://stormpath.com/blog/secure-your-rest-api-right-way/">Secure Your REST API... The Right Way</a>

***

### Username & password

The pair needs to be sent with each request either as parameters or in a header, so it means that it needs to be stored 
in the client in cleartext (so that the user does not have to enter it each time). When the password is being 
authenticated on the server, it goes through hashing that is deliberately little slower, in order to mitigate the brute 
force attacks.

***

### Authentication token

This approach combines API keys and username/password authentication. The user is asked for his credentials only on a 
first request, and in the response he is given his authentication token, which is used in every subsequent request for 
authentication.

The authentication token alone, if generated uniquely, is enough to identify the user in the db, but this can leave the 
system vulnerable to timing attacks.

( -> more on timing attacks in a post on <a href="/tech/password-atacks/">Password attacks</a> )
    
Safer alternative is to send the token in combination with a user key. Sending a table primary key is not a good idea, 
because it is too revealing, and it also tends to  be sequential. It is much better to use email, UUID or some other 
unique value.

The protection against the timing attacks is achieved by retrieveing the user  from the db and then safe comparing of 
the stored token against the one from the request.

{% gist 816623404b60b30726a8 secure_compare.rb %}


**Security concerns** 

Apart from the secure comparison there are also some other security concerns when using this technique.

- **HTTPS** should always be used when sending credentials; this is also valid for other approaches mentioned in this post.
- the token must be a **cryptographic strength one-time** random token; this is addressed by <a href="https://github.com/plataformatec/devise/blob/v3.1/lib/devise.rb#L459-L462">Devise.friendly_token</a>, if Devise gem is used.
- **storing hashed tokens**
- **expiring the tokens**

Hashing the token before storing it in the database is the safest option. It prevents the attacker that has acquired the 
database to also gain instant access to all the users, but it also adds some extra complexity to the application. 
However, storing a token in cleartext in client application / browser can not be avoided.

Tokens unlike passwords can easily be renewed/expired without much UX cost. This provides an option to periodically 
manually renew some or all tokens, or automatically on a regular basis.

Renewing a token on sign in would cause the sign out of any other client signed in with the same account. This could be 
fixed by having multiple tokens, one per client.

Also, for long lasting sessions, for example when a user is signed in a browser tab that is never closed and the user 
never signs out, the token would never be renewed.

The tokens can automatically expire after certain time (14 days for example). After the token expires, the user needs 
to sign in again in order for the new token to be generated.

#### Resources

- gist: josevalim - <a href="https://gist.github.com/josevalim/fb706b1e933ef01e4fb6#file-2_safe_token_authentication-rb">safe token authentication with Devise</a>
- stackoverflow: <a href="http://stackoverflow.com/questions/18605294/is-devises-token-authenticatable-secure">Is devise's token_authenticatable secure?</a>
- github: issue - <a href="https://github.com/gonzalo-bulnes/simple_token_authentication/issues/82">Is it safe to store authentication tokens in plain text?</a>
- blog: envylabs - <a href="http://blog.envylabs.com/post/75521798481/token-based-authentication-in-rails">Token Based Authentication in Rails</a>
- gist: <a href="https://gist.github.com/vasinov/8855052">generating and storing hashed token with Devise</a>
- blog: stormpath - <a href="https://stormpath.com/blog/top-six-reasons-use-api-keys-and-how/">Top Six Reasons to Use API Keys (and How!)</a>
- github: gem -  <a href="https://github.com/gonzalo-bulnes/simple_token_authentication">simple_token_authentication</a>

***
 
### Nonce 


#### Resources

- blog: <a href="http://www.intertwingly.net/blog/1585.html">Nonce</a> (09-04-2003)


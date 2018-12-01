---
layout:     tech_post
categories: ['tech']
slug:       password-attacks
title:      Password attacks
excerpt:    Brute-force attack, dictionary attack, rainbow table attacks, timing attack
date:       2014-08-19
tags:
  - ttt-security
animation:
  url: /assets/img/tech.gif
  width: 250
  height: 176  
---

### Brute-force attack

It employs the brute-force search algorithm in order to try to uncover the string. Large sets from which the characters are taken, and longer strings make this kind of attacks more computationally expensive and even impractical (the resources required for a brute-force attack grow exponentially with increasing string size).

For example, if the target string is **123**, and the attacker knows or guesses that the set used is only digits, this is how many tries it will take to guess the correct value if the digits are tried sequentially:  10¹ + 10² + 124

If the attacker obtains the database with user - encrypted password pairs, the decryption process can be made slower by using larger character sets, longer passwords and slower hashing algorithms.

If the attack is being done online, it can be prevented by:

- limiting the number of attempts that a password can be tried
- introducing time delays between successive attempts
- increasing the answer's complexity (e.g. requiring a CAPTCHA answer or verification code sent via cellphone)
- locking accounts out after unsuccessful logon attempts
- preventing a particular IP address from trying more than a predetermined number of password attempts against any account on the site (may be a problem for large networks behind proxy)

Brute-force attack is the attacker's last resort.

#### Resources

- wikipedia: <a href="http://en.wikipedia.org/wiki/Brute_force_attack">Brute-force attack</a>

***

### The dictionary attack

A "dictionary" in this context is a pre-arranged list of values. It can consist of common words, known passwords or combinations. It can also include values with some common rules applied, for example switching numbers for letters, appending characters, capitalizing the first letter and combining words, common keyboard patterns, concatenation of dictionary words, etc.

If the attacker gets an access to the database table containing the hashed passwords, in order to acquire the plain text passwords he takes the passwords from the dictionary, hashes them using the same method used in the database and compares the result to each entry in the table. If there is a password in the table that is also present in the dictionary, it will take the attacker the amount of time to hash the dictionary entry times the word position in the dictionary.

Best prevention against the dictionary attack is the use of more complex passwords that are less likely to be part of any dictionary.

In case of this kind of an attack, the speed of the hashing function works in favour of the attacker, so, using slower hashing algorithm makes this kind of an attack less practical.

Bcrypt algorithm is adaptable to future processor performance improvements, allowing for the arbitrarily increase of the processing cost of checking a password while still maintaining compatibility with the older password hashes.

#### Resources

- wikipedia: <a href="http://en.wikipedia.org/wiki/Dictionary_attack">Dictionary attack</a>
- blog: <a href="https://www.bentasker.co.uk/blog/security/201-why-you-should-be-asking-how-your-passwords-are-stored">Why You Shouldn’t be using SHA1 or MD5 to Store Passwords</a>
- <a href="http://www.openwall.com/crypt/">bcrypt</a>

***

### Rainbow table attacks

Rainbow table attack is a variant of a dictionary attack where all the dictionary values are pre-hashed and stored in the database, so only hashes need to be compared against the target. They are computationally intensive to generate, but once created are incredibly quick to use.

If the "salt" was used for hashing the passwords, the attacker would need to resort to the dictionary attack, that is, to appropriately hash each value with this particular salt, if the salt is known. Otherwise, guessing the salt each time would make it infeasible.

( -> more on salt use and bcrypt in a post on <a href="/tech/hashing-and-encryption/">Hashing and encryption</a> )

#### Resources

- wikipedia: <a href="http://en.wikipedia.org/wiki/Rainbow_table">Rainbow table</a>
- blog: <a href="https://www.bentasker.co.uk/blog/security/201-why-you-should-be-asking-how-your-passwords-are-stored">Why You Shouldn’t be using SHA1 or MD5 to Store Passwords</a>

***

### Timing attack

Timing attacks use statistical analysis of the duration of the application response to a certain request in order to learn something about the data that is being processed.

For example, if the string comparison is implemented byte by byte, it means that it returns as soon as there is no match. The comparison of the strings where the first characters match (but the rest does not) will take a little bit longer then in the case that they do not. Even though this difference in latency seems tiny, it still <a href="http://www.cs.rice.edu/~dwallach/pub/crosby-timing2009.pdf">can be exploited</a> to progress byte by byte until the whole string is uncovered.

This type of attack can be prevented by avoiding the variable return times of the comparison functions, for example by adding random delays to the returning failed functions or by comparing all the bytes even after a mismatch occurs.

#### Resources

- wikipedia: <a href="http://en.wikipedia.org/wiki/Timing_attack">Timing attack</a>
- blog: Coda Hale - <a href="http://codahale.com/a-lesson-in-timing-attacks/">A Lesson In Timing Attacks</a> (13-08-2009)
- paper:<a href="http://www.cs.rice.edu/~dwallach/pub/crosby-timing2009.pdf"> Opportunities And Limits Of Remote Timing Attacks</a>
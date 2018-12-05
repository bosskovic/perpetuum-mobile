---
layout:     tech_post
categories: ['tech']
slug:       "design-principles-of-the-rest-ful-json-api-hateoas"
title:      Design principles of the REST-ful JSON API (HATEOAS)
excerpt:    REST, JSON, API, HATEOAS, media types, top level resource representations, url templates, compound documents, urls, responses, errors, JSend response types, HTTP Status codes
date:       2014-09-04
tags:
  - ttt-api
  - ttt-back-end
animation:
  url: /assets/img/animated/tech.gif
  width: 250
  height: 176  
---

So many acronyms, I will start by explaining what they stand for.

#### REST - REpresentational State Transfer

In short, there is a database (a resource), there is a server logic that has a direct access to the database and there is a client that seeks data from the database.  The two (client and server) connect through a uniform interface: the server makes a part of a resource state available as a representation identified by an URI. The client sends the request to that URI with a HTTP verb (GET, POST, PUT, PATCH, DELETE) and request body, and receives a response with a status code and a body that may contain a representation. Each request is self contained - the server does not hold context of any previous requests - there are no server-side sessions.

( -> read more details in an article on <a title="Representational state transfer (REST)" href="/tech/rest/">REST</a> )

#### JSON - JavaScript Object Notation

Resources are typically represented by XML, JSON or HTML. JSON is simple, convenient and easily human-readable.

#### API - Application Programming Interface

In the context of web development, the server exposes a certain actions to the client through an API. This allows much flexibility in implementation of both server and client applications.

#### HATEOAS - Hypermedia as the Engine of Application State

This is a part of a "uniform interface" constraint of the REST architecture. Clients deliver state via body contents, query-string parameters, request headers and the requested URI (the resource name). Services deliver state to clients via body content, response codes, and response headers. This is technically referred-to as hypermedia (or hyperlinks within hypertext). Where necessary, links to the related objects are contained in the response body.

As a human is able to surf the website by clicking the hyper links embedded in the current page to access the related content, the machine (client) should be able to surf the API in a similar way.

### Design principles of the REST-ful JSON API (HATEOAS)

Ok, so in short, this translates to: what kind of JSON should be returned to what kind of requests.

As my reference I am using a standard for building APIs in JSON proposed at <a href="http://jsonapi.org/">jsonapi.org</a>. This standard is not final yet, and sometimes it allows for several variants. What follows is only an excerpt and my selection.

#### Media type

application/vnd.MYAPP+json; version=VESRSION

Resources are fetched through HTTP method GET exclusively, and created, updated and deleted through HTTP methods POST, PUT/PATCH and DELETE respectively.

#### Top Level

Document's top level should contain a representation of the resource or collection of resources primarily targeted by a request, and it/they should be keyed by the resource type.

A document's top level MAY also have the following members:

- "meta": meta-information about a resource, such as pagination.
- "links": URL templates to be used for expanding resources' relationships URLs.
- "linked": a collection of resource objects, grouped by type, that are linked to the primary resource(s) and/or each other (i.e. "linked resource(s)").

No other members should be present at the top level of a document.

#### Resource Representations

An individual resource should be represented as a single "resource object" or a string value containing its ID.

<pre>
{
  "posts": {
  "id": "1",
  // ... attributes of this post
  }
}  
</pre>
<pre>
{
  "posts": "1"
}
</pre>

A collection of any number of resources should be represented as an array of resource objects or IDs, or as a single "collection object".

<pre>
{
  "posts": [{
  "id": "1"
  // ... attributes of this post
  }, {
  "id": "2"
  // ... attributes of this post
  }]
}
</pre>
<pre>
{
  "posts": ["1", "2"]
}
</pre>

An example of a single collection object:

    {
      "comments": {
      "href": "http://example.com/comments/5,12,17,20",
      "ids": [ "5", "12", "17", "20" ],
      "type": "comments"
      }
    }


There are four reserved keys in resource objects:

- "id" - a unique identifier, should be in every resource when available; the value must be an alphanumeric string that may contain dashes and underscores
- "type" - may be omitted when the resource is keyed by the resource type
- "href" - URL of the resource in a response from the server; optional; it is more efficient to specify the URL templates at the root level of a response then to specify individual URLs per resource
- "links" - JSON object that represents linked resources, keyed by the name of each association; the value of the object may be its ID or the resource object

<pre>
//...
{
  "id": "1",
  "title": "Rails is Omakase",
  "links": {
    "author": "17"
  }
}
//...
</pre>
<pre>
//...
{
  "id": "1",
  "title": "Rails is Omakase",
  "links": {
    "author": {
      "href": "http://example.com/people/17",
      "id": "17",
      "type": "people"
    }
  }
}
//...
</pre>

To-many relationships **MUST** be represented with one of the formats for resource collections described above.

<pre>
//...
  {
    "id": "1",
    "title": "Rails is Omakase",
    "links": {
      "comments": [ "5", "12", "17", "20" ]
    }
  }
//...
</pre>
<pre>
//...
  {
    "id": "1",
    "title": "Rails is Omakase",
    "links": {
      "comments": {
        "href": "http://example.com/comments/5,12,17,20",
        "ids": [ "5", "12", "17", "20" ],
        "type": "comments"
      }
    }
  }
//...
</pre>

####  URL Templates

A top-level "links" object may be used to specify URL templates that can be used to formulate URLs for resources according to their type.<br />

<pre>{
  "links": {
    "posts.comments": "http://example.com/comments?posts={posts.id}"
  },
  "posts": [{
    "id": "1",
    "title": "Rails is Omakase"
  }, {
    "id": "2",
    "title": "The Parley Letter"
  }]
}</pre>
<pre>{
  "links": {
    "posts.comments": "http://example.com/comments/{posts.comments}"
  },
  "posts": [{
    "id": "1",
    "title": "Rails is Omakase",
    "links": {
      "comments": [ "1", "2", "3", "4" ]
    }
  }]
}</pre>

The top-level "links" object has the following behavior:

- Each key is a dot-separated path that points at a repeated relationship. Paths start with a particular resource type and can traverse related resources. For example "posts.comments" points at the "comments" relationship in each resource of type "posts".
- The value of each key is interpreted as a URL template.
- For each resource that the path points to, act as if it specified a relationship formed by expanding the URL template with the non-URL value actually specified.

#### Compound Documents

To save HTTP requests, responses may optionally allow for the inclusion of linked resources along with the requested primary resources. Such response documents are called "compound documents".

In a compound document, linked resources must be included as resource objects in a top level "linked" object, in which they are grouped together in arrays according to their type.

The type of each relationship may be specified in a resource-level or top- level "links" object with the "type" key. This facilitates lookups of linked resource objects by the client.

<pre>{
  "links": {
    "posts.author": {
      "href": "http://example.com/people/{posts.author}",
      "type": "people"
    },
    "posts.comments": {
      "href": "http://example.com/comments/{posts.comments}",
      "type": "comments"
    }
  },
  "posts": [{
    "id": "1",
    "title": "Rails is Omakase",
    "links": {
      "author": "9",
      "comments": [ "1", "2", "3" ]
    }}, {
    "id": "2",
    "title": "The Parley Letter",
    "links": {
      "author": "9",
      "comments": [ "4", "5" ]
   }}, {
    "id": "1",
    "title": "Dependency Injection is Not a Virtue",
    "links": {
      "author": "9",
      "comments": [ "6" ]
    }
  }],
  "linked": {
    "people": [{
      "id": "9",
      "name": "@d2h"
    }],
    "comments": [{
      "id": "1",
      "body": "Mmmmmakase"
    }, {
      "id": "2",
      "body": "I prefer unagi"
    }, {
      "id": "3",
      "body": "What's Omakase?"
    }, {
      "id": "4",
      "body": "Parley is a discussion, especially one between enemies"
    }, {
      "id": "5",
      "body": "The parsley letter"
    }, {
      "id": "6",
      "body": "Dependency Injection is Not a Vice"
    }]
  }
}
</pre>

#### URLS

<table><tbody><tr>
  <td>URLs for resource collections</td>
  <td>/photos</td>
</tr><tr>
  <td>URLs for individual resources</td>
  <td>/photos/1</td>
</tr><tr>
  <td>URLs for multiple individual resources</td>
  <td>/photos/1,2,3</td>
</tr><tr>
  <td>Filtering - one filter</td>
  <td>/comments?posts=1</td>
</tr><tr>
  <td>Filtering - multiple filters</td>
  <td>/comments?posts=1&amp;author=12</td>
</tr><tr>
  <td>Inclusion of linked resources</td>
  <td>/posts/1?include=comments</td>
</tr><tr>
  <td></td>
  <td>/posts/1?include=comments.author</td>
</tr><tr>
  <td>Inclusion of multiple linked resources</td>
  <td>/posts/1?include=author,comments,comments.author</td>
</tr><tr>
  <td>Sparse fieldsets</td>
  <td>/people?fields=id,name,age</td>
</tr><tr>
  <td>Fields for any resource type</td>
  <td>/posts?include=author&amp;fields[posts]=id,title&amp;fields[people]=id,name</td>
</tr><tr>
  <td>Sorting</td>
  <td>/people?sort=age</td>
</tr><tr>
  <td>Multiple sort criteria</td>
  <td>/people?sort=age,name</td>
</tr><tr>
  <td>Descending sort order</td>
  <td>/posts?sort=-created,title</td>
</tr></tbody></table>

### Responses

#### 201 Created

When a resource has been created, the server must return a 201 Created status code. The response must include a Location header identifying the location of the resource created by the request. If resource's object includes an href key, the Location URL MUST match the href value.

The response should also include a document that contains the primary resource(s) created. If absent, the client should treat the transmitted document as accepted without modification.

#### 204 No Content

A server must return a 204 No Content status code if an update is successful and the client's current attributes remain up to date. This applies to PUT requests as well as POST and DELETE requests that modify links without affecting other attributes of a resource.

#### 200 OK

If a server accepts an update but also changes the resource(s) in other ways than those specified by the request (for example, updating the updatedAt attribute or a computed sha), it must return a 200 OK response as well as a representation of the updated resource(s) as if a GET request was made to the request URL.

### Errors

Error objects are specialized resource objects that may be returned in a response to provide additional information about problems encountered while performing an operation. Error objects should be returned as a collection keyed by "errors" in the top level of a JSON API document, and should not be returned with any other top level resources.

An error object may have the following members:

- "id" - A unique identifier for this particular occurrence of the problem.
- "href" - A URI that MAY yield further details about this particular occurrence of the problem.
- "status" - The HTTP status code applicable to this problem, expressed as a string value.
- "code" - An application-specific error code, expressed as a string value.
- "title" - A short, human-readable summary of the problem. It SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
- "detail" - A human-readable explanation specific to this occurrence of the problem.
- "links" - Associated resources which can be dereferenced from the request document.
- "path" - The relative path to the relevant attribute within the associated resource(s). Only appropriate for problems that apply to a single resource or type of resource.

Additional members may be specified within error objects.

### JSend response types

The specification at jsonapi.org specifies that a response body should have the data under they key "data" or keyed with the resource type. Other then that permitted top level members are "meta", "links" and "linked".

<a href="http://labs.omniti.com/labs/jsend">JSend specification</a> proposes the addition of another member: "status". It seems like a good idea, especially for the responses to the requests that alter the date and for the errors and fails.

<table><tbody><tr>
  <td>status</td>
  <td>description</td>
  <td>required keys</td>
  <td>optional keys</td>
</tr><tr>
  <td>success</td>
  <td>All went well, and (usually) some data was returned.</td>
  <td>status, data</td>
  <td>-</td>
</tr><tr>
  <td>fail</td>
  <td>There was a problem with the data submitted, or some pre-condition of the API call wasn't satisfied</td>
  <td>status, data</td>
  <td>-</td>
</tr><tr>
  <td>error</td>
  <td>An error occurred in processing the request, i.e. an exception was thrown</td>
  <td>status, message</td>
  <td>code, data</td>
</tr></tbody></table>

####  HTTP Status Codes

Here's a great <a href="http://www.restapitutorial.com/httpstatuscodes.html">resource</a> on HTTP status codes.

#### Resources

- <a href="http://jsonapi.org/">A standard for building APIs in JSON</a>
- <a href="http://labs.omniti.com/labs/jsend">Jsend specification</a>


---
layout: default
title: A lot or a little?
---

## Bookmarks, a lot

I wrote an app to keep track of bookmarks. It's called [Bookmarks-a-lot][bml-github]. 

[Try out the live version of Bookmarks-a-lot][bml-live].

I wrote this to try out working with React. I had been looking to strengthen my skills and I thought that building something like this would be simple and fun. Boy was I wrong.

Just kidding. Sort of. Firstoff, React is.. ok. I know I'm backwards, but I learned about Vue first. So React, to me, seems weird. That makes since, since it came first and (probably?) pioneered a lot of the techniques that things like Angular and Vue have taken and elaborated on. But, fundamentally it's similar.

This was also the first fully JS app I had tried to make that used something like Firebase. I encountered this in some courses I went through from [Ray Villalobos][raybo] on [lynda.com][lynda-react-spas].

It's not really complicated - it's just a little more complicated than the lesson covered. Which is fine! I learned a few things. 

1. React (with routers) doesn't work how I expected. You really have to be careful about what information you pass to the view, and when. For example, if you pass the user to the detail page, you then make it so the user has to go through the first page to get the user id, unless you re-establish it again on the detail page. I think this is why a lot of pages struggle with having permanent links to things. It's non-trivial to set up. 

1. Firebase is weird. Given my experience working with relational databases, like mysql and postgres. I don't think it was too different, in the end, but at first it was difficult getting used to working with these nosql style datastores. But I think I got the hang of it.

### Running on Fumes

Here's how these things generally work with me. I create a new project, and I have to come up with a name. Ugh, names. Since I'm in a hurry to get started, I usually just name the thing something stupid, like [Gascan], telling myself that later, I'll come back with a really good name, this one is just temporary. That never happens. The hastily named project inevitably remains named the stupid thing. And so it was with this project.

This time, I chose the name "Bookmarks-a-lot". Which is a marker from my childhood:

![remember these?](/assets/images/blog/marks-a-lot-old.jpg)

Apparently they still exist as a wholly owned subsidiary of the Avery corporation.

![Cheaper to print, I guess](/assets/images/blog/marks-a-lot-new.jpg)

So I patterned my branding after the old markers I remember. 

When I was kid, we had Sharpies, and Marks-a-lots. Sharpies were for fine print, and Marks-a-lot were for, oh, say, filling in fields of color on a poster. They *smelled*. Good? Bad? That's up to you.

### The Future, Kevin?

This thing is very very simple. I have plans, though, because I've never really come across a bookmarking service that I really liked.

1. Make a bookmarklet, to make it super easy to add bookmarks. This bookmarklet will also provide the screenshots (I think! Maybe this will be difficult. I don't think I can do screenshots unless this app has a backend component.)

1. A bunch of little small things, like adding pagination. Making it look better. General "improvements".

1. Taking advantage of [Firebase's email-based sign in][firebase-email]. I really like this feature and I think it would be cool to try to implement.

1. I want to be able to import and export bookmarks. Maybe I can use the [Netscape bookmarks format][netscape-bookmarks].

So, yeah. A work in progress, like everything. Check it out!

[Bookmarks-a-lot][bml-live]

[bml-github]: https://github.com/kpmcguire/bookmarks-a-lot
[bml-live]: https://bookmarks-a-lot.netlify.app/
[raybo]: https://raybo.org
[lynda-react-spas]: https://www.lynda.com/course-tutorials/React-SPAs/774920-2.html?srchtrk=index%3a1%0alinktypeid%3a2%0aq%3areact+spas%0apage%3a1%0as%3arelevance%0asa%3atrue%0aproducttypeid%3a2
[gascan]: https://github.com/kpmcguire/gascanjs
[firebase-email]: https://firebase.google.com/docs/auth/web/email-link-auth
[netscape-bookmarks]: https://en.wikipedia.org/wiki/Bookmark_(digital)#Storage
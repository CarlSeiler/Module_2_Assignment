// lint doesn't like duplicate keys.
// Apparently some implementations do not like duplicate keys, but
// technically not prohibited.  They SHOULD be unique (per RFC7159).

// looks like store is an array of of objects that 
// has a single key of posts, which is an array of objects
// consisting of name, url, text, and comments.  
// Comments is an array of texts strings.
/*

let store = {
  posts: [
    {name: 'Top 10 ES6 Features every Web Developer must know',
    url: 'https://webapplog.com/es6',
    text: 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.',
    comments: [
      text: 'Cruel…..var { house, mouse} = No type optimization at all',
      text: 'I think you’re undervaluing the benefit of ‘let’ and ‘const’.',
      text: '(p1,p2)=>{ … } ,i understand this ,thank you !'      
    ]
    }
  ]
};


*/

// Without keys 'text:' in there...
let correctedStore = {
  posts: [
    {name: 'Top 10 ES6 Features every Web Developer must know',
    url: 'https://webapplog.com/es6',
    text: 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.',
    comments: [ 
     'Cruel…..var { house, mouse} = No type optimization at all',
     'I think you’re undervaluing the benefit of ‘let’ and ‘const’.',
     '(p1,p2)=>{ … } ,i understand this ,thank you !'      
    ]
    }
  ]
};

// Turns out that it is OK in node to have the format as in the example.  Of course
// with duplicate keys, you can't refer to a single entry.

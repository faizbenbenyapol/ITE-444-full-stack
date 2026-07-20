async function getPosts() {
 
   try {
 
       const res = await fetch("https://dummyjson.com/users/1");
       const user = await res.json();
 
       const postRes = await fetch(
           `https://dummyjson.com/posts/user/${user.id}`
       );
 
       const posts = await postRes.json();
 
       console.log(user);
       console.log(posts);
 
   } catch (err) {
       console.log(err);
   }
}
 
getPosts();
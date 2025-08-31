
function ProfileCard({  name = "Anonymous",
  age = 18,
  bio = "No bio provided",
  isStudent = true}){
    
    return(
        <div style={{border: "1px solid gray", margin: "10px", padding: "10px", borderRadius: "8px"}}>
            <h2>Welcome {name}! your age is {age}</h2>
            <h3>Bio {bio}</h3>
            <h4> {isStudent ? "You are a Student" : "You are Graduated" }</h4>
        </div>
    );  
}
// ✅ Add Default Props but this work when you donot use Destructuring
ProfileCard.defaultProps = {
  name: "Anonymous",
  age: 18,
  bio: "No bio provided",
  isStudent: true
};

export default ProfileCard;
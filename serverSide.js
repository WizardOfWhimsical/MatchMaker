function compareProfileMatches(currentUser, arrayOfUsers) {
    let score = 0;
    let bestScore = 41;
    let i;
    let bestMatch;
    for (let user of arrayOfUsers) {
      for (i = 0; i < user.scores.length;) {
        let diff = Math.abs(user.scores[i] - currentUser.scores[i]);
        score += diff;
        ++i;
      } //end of regular for loop
    //   console.log(score)
    //   console.log("\n"+"****")
      
      if (score < bestScore) {
        bestMatch = user;
        bestScore = score;
        // console.log(bestMatch)
        score = 0;
      } else {
        score = 0;
      }
    } //end of for/of loop
    return bestMatch;
  } //end of function
  
  export default compareProfileMatches;
# Coupon Shuffle

## Thoughts and Journey

First I thought to solve it the most intuitive, like how human would do the job.
List out the options, pick one, eliminate outdated options, pick again from the updated options.
When we ran out of options, it means we've reach one of combination, we push it to result, we go back a level and we try another option.
We have a scoped value at every level that represents if the next level has reach an combination, and we mark it to true if we do, so we won't push subsets of the reached combination.

So basically:

- list out the options
- pick one
- eliminate outdated options
- pick again from the updated options.
- push to result when ran out of options.
- have a scoped value to keep track if deeper level has reached an combination, so we don't push in subsets.
- try other options.

I've never really done coding challenges like leetcode or others, I didn't have a clean idea of how to achieve the goal.
I went to consult people that I know that do leetcode, as I think they might notice some similar patterns from challenges they've done before, so I won't go too much off track.
Unfortunately we didn't notice a pattern or a elegant solution, and we resorted to a brute force solution.
At this point I've kind of waste too much brain power already, I couldn't even think of how to generate all possible combinations, and I asked chatGpt for that.🤡

The brute force solution is just three step:

- list out all possible combinations
- eliminate all invalid combinations
- eliminate all subsets

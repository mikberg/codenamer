/*
Let's use Petter's algorithm here:

  - given a score configuration:
    - in the first iteration, generate a list of relations s.t.
      - they relate word combinations (n * n)
      - assign them scores
      - do not create relations where the score is zero
    - for subsequent iterations:
      - update the score objects
      - eliminate objects with score equal to zero
*/

function scoreCombination(combination = [], filters = []) {
  return filters
    .map(filter => filter(combination))
    .reduce((scoreA, scoreB) => scoreA * scoreB, 1);
}

function createRelations(words, filters = []) {
  return words
    .map(word => ({
      words: [word],
      score: scoreCombination([word], filters),
    }))
    .filter(relation => relation.score > 0);
}

// relation -> [relation]
function addWord(relation, words, filters = []) {
  return words
    .map(word => {
      const combination = [...relation.words, word];
      return {
        words: combination,
        score: scoreCombination(combination, filters),
      };
    })
    .filter(rel => rel.score > 0);
}

export default function arrange(words, positions = []) {
  if (positions.length === 0) {
    return [];
  }

  let relations = createRelations(words, positions[0]);

  positions.slice(1).forEach(filters => {
    let newRelations = [];
    relations.forEach(relation => {
      newRelations = [...newRelations, ...addWord(relation, words, filters)];
    });
    relations = newRelations;
  });

  return relations.map(relation => relation.words);
}

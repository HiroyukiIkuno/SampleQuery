# SampleQuery

# memo
```yaml
- uses: actions/github-script@v8
  with:
    script: |
      // fetchでレビュアーリストを取得
      const response = await fetch('http://localhost:8000/reviwer');
      if (!response.ok) {
        throw new Error(`Failed to fetch reviewers: ${response.statusText}`);
      }
      const data = await response.json();
      const reviewers = data.reviewers;

      // PR番号を取得
      const prNumber = context.payload.pull_request.number;

      // reviewersが配列で存在する場合のみアサイン
      if (Array.isArray(reviewers) && reviewers.length > 0) {
        await github.rest.pulls.requestReviewers({
          owner: context.repo.owner,
          repo: context.repo.repo,
          pull_number: prNumber,
          reviewers: reviewers
        });
        console.log(`Assigned reviewers: ${reviewers.join(', ')}`);
      } else {
        console.log('No reviewers to assign.');
      }
```
import { FilterByAuthorPipe } from './filter-by-author.pipe';

describe('FilterByAuthorPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterByAuthorPipe();
    expect(pipe).toBeTruthy();
  });
});

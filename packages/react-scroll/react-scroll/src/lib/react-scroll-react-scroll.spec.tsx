import { render } from '@testing-library/react';

import ReactScrollReactScroll from './react-scroll-react-scroll';

describe('ReactScrollReactScroll', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactScrollReactScroll />);
    expect(baseElement).toBeTruthy();
  });
});

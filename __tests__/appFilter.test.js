import { render, screen, fireEvent,waitFor } from '@testing-library/react-native';

import nock from 'nock';

import App from '../App';

import { iols } from '../utils/testdata';

describe('Filtering the lens list', () => {
      afterAll(() => {
        nock.cleanAll();
        nock.restore();
      });
      it('When a Alcon brand is selected the list should display only Alcon Lens', async () => {
        nock('https://ia-server2-production.up.railway.app').get('/api/iols').reply(200, iols);
        render(<App />);

        const filterText = await screen.findByRole('text',{name: 'All'});
        fireEvent.press(filterText);
        const option = await screen.findByRole('text',{name: "Alcon"})
        fireEvent.press(option);
        
        // expect(await screen.findAllByRole('text',{name: /Alcon Test/})).toBeTruthy();
        // expect(screen.queryByRole('text',{name:/Zeiss Test/})).toBe(null);
     
        // screen.debug();
      });
});

import { beginAjaxCall, ajaxCallError } from '../ajaxStatusActions';
import { BEGIN_AJAX_CALL, AJAX_CALL_ERROR } from '../actionTypes';

describe('ajaxStatusActions', () => {
	it('beginAjaxCall runs correctly', () => {
		expect(beginAjaxCall('a description')).toEqual({
			type: BEGIN_AJAX_CALL,
			payload: { description: 'a description' },
		});
	});

	it('ajaxCallError runs correctly', () => {
		expect(ajaxCallError('a description')).toEqual({
			type: AJAX_CALL_ERROR,
			payload: { description: 'a description' },
		});
	});
});

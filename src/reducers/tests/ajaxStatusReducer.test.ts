import ajaxStatusReducer, { actionTypeEndsInSuccess } from '../ajaxStatusReducer';

describe('Ajax Status Reducer', () => {
  describe('ajaxStatusReducer', () => {
    it('should return existing state when type not found', () => {
      expect(
        ajaxStatusReducer(0, {
          type: 'NO_TYPE_FOUND',
          payload: {
            description: 'getAllRecipes',
          },
        }),
      ).toEqual(0);
    });
    it('should increment ajax count when no initials state is set for BEGIN_AJAX_CALL', () => {
      expect(
        ajaxStatusReducer(undefined, {
          type: 'BEGIN_AJAX_CALL',
          payload: {
            description: 'getAllRecipes',
          },
        }),
      ).toEqual(1);
    });
    it('should increment ajax count when state is already set for BEGIN_AJAX_CALL', () => {
      expect(
        ajaxStatusReducer(0, {
          type: 'BEGIN_AJAX_CALL',
          payload: {
            description: 'getAllRecipes',
          },
        }),
      ).toEqual(1);
    });
    it('should decrement ajax count when for BEGIN_AJAX_CALL_SUCCESS', () => {
      expect(
        ajaxStatusReducer(1, {
          type: 'BEGIN_AJAX_CALL_SUCCESS',
          payload: {
            description: 'getAllRecipes',
          },
        }),
      ).toEqual(0);
    });
    it('should decrement ajax count for AJAX_CALL_ERROR', () => {
      expect(
        ajaxStatusReducer(1, {
          type: 'AJAX_CALL_ERROR',
          payload: {
            description: 'getAllRecipes',
          },
        }),
      ).toEqual(0);
    });
  });

  describe('actionTypeEndsInSuccess', () => {
    it('should return true for BEGIN_AJAX_CALL_SUCCESS', () => {
      expect(actionTypeEndsInSuccess('BEGIN_AJAX_CALL_SUCCESS')).toBe(true);
    });
    it('should return false for a type that doe not end in _SUCCESS', () => {
      expect(actionTypeEndsInSuccess('BEGIN_AJAX_CALL')).toBe(false);
    });
  });
});

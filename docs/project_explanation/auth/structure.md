# Authentication Structure

## Overview
Authentication logic is under `src/features/auth`, while `authUtils.ts` (in `src/utils/`) handles token storage and `authAxios`.
The later happens because `authAxios` is to be used by other features  as well.

## Notes
- Modify `authService.ts` for API changes.
- Update `authUtils.ts` for token logic.

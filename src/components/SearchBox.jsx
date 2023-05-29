import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function SearchBox({ players, handleSubmit }) {
  const options = players.map((player) => {
    return {
      id: player.player.id,
      name: player.player.name,
      photo: player.player.photo,
    };
  });
  return (
    <form method="POST" onSubmit={handleSubmit}>
      <div className="relative">
        {options && (
          <Autocomplete
            // disablePortal
            id="search-box"
            name="searchBox"
            options={options}
            autoHighlight
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            // sx={{ width: 300 }}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{
                  '& > img': { mr: 2, flexShrink: 0 },
                  backgroundColor: 'info',
                  fontSize: '16px',
                }}
                {...props}
              >
                <img
                  loading="lazy"
                  className="rounded-full"
                  width="80"
                  src={option.photo}
                  alt={option.name}
                />
                {option.name}
              </Box>
            )}
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderInput={(params) => (
              <TextField {...params} label="Guess a Player" />
            )}
          />
        )}
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-green-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Guess
        </button>
      </div>
    </form>
  );
}

export default SearchBox;

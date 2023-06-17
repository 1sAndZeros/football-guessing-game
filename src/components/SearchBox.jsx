import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function SearchBox({ players, handleSubmit, noOfGuesses }) {
  const options = players.map((player) => {
    return {
      id: player.player.id,
      name: player.player.name,
      photo: player.player.photo,
      team: player.statistics[0].team.logo,
    };
  });
  return (
    <form method="POST" onSubmit={handleSubmit}>
      <div className="relative">
        {options && (
          <Autocomplete
            disablePortal
            id="search-box"
            name="searchBox"
            options={options}
            autoHighlight
            getOptionLabel={(option) => `${option.name}`}
            isOptionEqualToValue={(option, value) => option.id === value.id}
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
                  width="50"
                  src={option.photo}
                  alt={option.name}
                />
                {option.name}
                <img
                  loading="lazy"
                  className="ml-3"
                  width="25"
                  src={option.team}
                  alt={option.team}
                />
              </Box>
            )}
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderInput={(params) => (
              <TextField
                {...params}
                label="Guess a Player"
                variant="filled"
                color="info"
                className="input-box"
              />
            )}
          />
        )}
        <button type="submit" className="guess-btn">
          {`Guess ${noOfGuesses + 1} of 6`}
        </button>
      </div>
    </form>
  );
}

export default SearchBox;

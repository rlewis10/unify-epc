import React from 'react'

const Alerts = () => {
  return (
    <div>
      <h1>Alerts</h1>
      <form>
          <div id="checkbox-group">Please select how often you would like to receive email alerts:</div>
          <div role="group" aria-labelledby="checkbox-group">
            <label>
                <input type="checkbox" name="checked" value="Three" />
                Send upon alert
              </label>
            <label>
              <input type="checkbox" name="checked" value="One" />
              Daily Email Roundup
            </label>
            <label>
              <input type="checkbox" name="checked" value="Two" />
              Weekly Email Roundup
            </label>
            <label>
              <input type="checkbox" name="checked" value="Four" />
              Unsubscribed
            </label>
          </div>

          <button type="reset">Reset</button>
          <button type="submit">Save</button>
        </form>
    </div>
  )
}

export default Alerts
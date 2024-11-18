:: Create virtual environment
python -m venv minorvenv

:: Activate virtual environment
call minorvenv\Scripts\activate

:: Install dependencies
pip install --no-cache-dir -r requirements.txt

:: Deactivate the virtual environment
call minorvenv\Scripts\deactivate

echo Setup complete.

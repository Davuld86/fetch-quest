"""fixing messages

Revision ID: bc25f6f77d7b
Revises: d6fdb05635b5
Create Date: 2023-12-14 04:45:51.352163

"""
from alembic import op
import sqlalchemy as sa
from datetime import datetime

# revision identifiers, used by Alembic.
revision = 'bc25f6f77d7b'
down_revision = 'd6fdb05635b5'
branch_labels = None
depends_on = None

# ... other imports and dependencies ...

def upgrade():
    op.create_table(
        'messages',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('content', sa.String, nullable=False),
        sa.Column('timestamp', sa.DateTime, default=datetime.now(), nullable=False),
        sa.Column('sender_id', sa.Integer, sa.ForeignKey('users.id'), nullable=False),
        sa.Column('receiver_id', sa.Integer, sa.ForeignKey('users.id'), nullable=False),
    )

def downgrade():
    # Downgrade should be empty or contain operations to handle downgrade if necessary
    pass

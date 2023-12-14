"""Create messages table

Revision ID: 6fb047c690d0
Revises: bc25f6f77d7b
Create Date: 2023-12-14 04:52:54.444126

"""
from alembic import op
import sqlalchemy as sa
from datetime import datetime

# revision identifiers, used by Alembic.
revision = '6fb047c690d0'
down_revision = 'bc25f6f77d7b'
branch_labels = None
depends_on = None
# ... other imports and dependencies ...

def upgrade():
    op.create_table(
        'messages',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('content', sa.String, nullable=False),
        sa.Column('timestamp', sa.DateTime, default=datetime.now, nullable=False),
        sa.Column('sender_id', sa.Integer, sa.ForeignKey('users.id'), nullable=False),
        sa.Column('receiver_id', sa.Integer, sa.ForeignKey('users.id'), nullable=False),
    )

def downgrade():
    op.drop_table('messages')

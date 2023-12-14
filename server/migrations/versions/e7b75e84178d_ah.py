"""ah'


Revision ID: e7b75e84178d
Revises: 6fb047c690d0
Create Date: 2023-12-14 04:57:04.380898

"""
from alembic import op
import sqlalchemy as sa
from datetime import datetime


# revision identifiers, used by Alembic.
revision = 'e7b75e84178d'
down_revision = '6fb047c690d0'
branch_labels = None
depends_on = None


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

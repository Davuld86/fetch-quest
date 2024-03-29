"""max hp for enemies too :p

Revision ID: ade01c963666
Revises: a758d61de5ae
Create Date: 2024-02-04 06:10:46.918145

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ade01c963666'
down_revision = 'a758d61de5ae'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('enemies', schema=None) as batch_op:
        batch_op.add_column(sa.Column('max_hp', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('enemies', schema=None) as batch_op:
        batch_op.drop_column('max_hp')

    # ### end Alembic commands ###
